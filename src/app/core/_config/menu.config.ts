export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Início',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {section: 'ADMINISTRATIVO'},
        {
          title: 'Clientes',
          root: true,
          icon: 'flaticon2-avatar',
          page: '/cadastros/clientes',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Fornecedores',
          root: true,
          icon: 'flaticon-rotate',
          page: '/cadastros/fornecedores',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Serviços',
          root: true,
          icon: 'flaticon2-box',
          page: '/cadastros/servicos',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Funcionários',
          root: true,
          icon: 'flaticon2-shield',
          page: '/cadastros/funcionarios',
          bullet: 'dot',
        },
        {
          title: 'Produtos',
          icon: 'flaticon2-supermarket',
          page: '/cadastros/produtos',
          bullet: 'dot',
        },
        {
          title: 'Usuários do sistema',
          icon: 'flaticon2-shield',
          page: '/cadastros/usuarios',
          bullet: 'dot',
        },
        {section: 'Vendas'},
        {
          title: 'Propostas Comerciais',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-rocket',
          page: '/vendas/propostas'
        },
        {
          title: 'Notas Fiscais',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-list-1',
          submenu: [
            {
              title: 'Emitir nova',
              page: '/user-management/users'
            },
            {
              title: 'Cancelar',
              page: '/user-management/roles'
            },
            {
              title: 'Relatório',
              page: '/user-management/roles'
            }
          ]
        },
        {section: 'Serviços'},
        {
          title: 'Contratos',
          root: true,
          icon: 'flaticon-notepad',
          page: '/servicos/contratos',
          bullet: 'dot',
        },
        {
          title: 'Relatórios',
          root: true,
          icon: 'flaticon2-poll-symbol',
          page: '/servicos/relatorios',
          bullet: 'dot',
        },
        {section: 'Finanças'},
        {
          title: 'Contas',
          root: true,
          bullet: 'dot',
          icon: 'flaticon-coins',
          submenu: [
            {
              title: 'A pagar',
              page: '/servicos/contas-a-pagar'
            },
            {
              title: 'A receber',
              page: '/financas/contas-receber'
            }
          ]
        },
        {
          title: 'Cobranças',
          root: true,
          icon: 'flaticon2-list-2',
          page: '/financas/cobrancas',
          bullet: 'dot',
        },
        {section: 'Configurações'},
        {
          title: 'Parâmetros',
          root: true,
          bullet: 'dot',
          icon: 'flaticon-settings',
          submenu: [
            {
              title: 'Categorias',
              page: '/cadastros/categorias'
            },
            {
              title: 'Tipo de Serviços',
              page: '/cadastros/tipo-de-servicos'
            },
          ]
        },
        {section: '.'},
        {section: '.'},
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
