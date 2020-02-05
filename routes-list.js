const APP_ROUTES = [
  {
    name: 'index',
    page: 'recharge',
    pattern: '/',
    title: 'Demo'
  },
  {
    name: 'recharge',
    page: 'recharge',
    title: 'Recharge',
    pattern: '/recharge'
  }, {
    name: 'Select Plan',
    page: 'plans',
    title: 'Select Plans',
    pattern: '/recharge/plans'
  },
  {
    name: 'Texts',
    page: 'recharge',
    title: 'Recharge',
    subRoutes: ['text1', 'text2', 'text3'],
    pattern: '/recharge/:section'
  },
  {
    name: 'Plans',
    page: 'plans',
    title: 'Select Plans',
    subRoutes: ['text1', 'text2', 'text3'],
    pattern: '/recharge/:section/plans'
  }
];

module.exports = APP_ROUTES;
