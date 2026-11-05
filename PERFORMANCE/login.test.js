import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';

const users = new SharedArray('usuarios', () =>
  JSON.parse(open('./data/users.json'))
);

export const options = {
  stages: [
    { duration: '20s', target: 20 },   // ramp-up
    { duration: '1m40s', target: 20 }, // carga constante (total: 2 min)
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<2000'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  // 20 VUs dividem os 5 usuários de forma cíclica
  const user = users[(__VU - 1) % users.length];

  // 1) abre a página de login e captura o nonce do formulário
  const page = http.get(`${BASE_URL}/minha-conta/`);
  check(page, {
    'página de login carregou': (r) => r.status === 200,
  });

  const nonce = ((page.body || '').match(
    /name="woocommerce-login-nonce"[^>]*value="([^"]+)"/
  ) || [])[1] || '';

  // 2) envia o login
  const res = http.post(`${BASE_URL}/minha-conta/`, {
    username: user.username,
    password: user.password,
    'woocommerce-login-nonce': nonce,
    _wp_http_referer: '/minha-conta/',
    login: 'Login',
  });

  check(res, {
    'login retornou 200': (r) => r.status === 200,
    'usuário autenticado (link de logout presente)': (r) =>
      (r.body || '').includes('customer-logout'),
  });

  sleep(1);
}