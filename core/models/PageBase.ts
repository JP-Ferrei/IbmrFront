import { Vue } from "nuxt-property-decorator";
import { Framework } from "vuetify";

export class PageBase extends Vue {
  public isMobile: boolean = false;
  public isMedium: boolean = false;
  public isLarge: boolean = false;

  public isAdmin: boolean = false;
  public isDentista: boolean = false;
  public isCliente: boolean = false;
  public isRecepcionista: boolean = false;

  public sessionApp: any;
  public app: {
    foto: string;
    email: string;
    tipoId: number;
    usuarioId: number;
    usuarioNome: string;
    token: string;
  } = {
    foto: "",
    email: "",
    tipoId: 0,
    usuarioId: 0,
    usuarioNome: "",
    token: ""
  };

  constructor() {
    super();

    if (!localStorage.sessionApp) {
      return;
    }

    this.sessionApp = JSON.parse(localStorage.sessionApp);
    this.app.foto = this.sessionApp.dados.foto;
    this.app.email = this.sessionApp.dados.email;
    this.app.tipoId = this.sessionApp.dados.tipoId;
    this.app.usuarioId = this.sessionApp.dados.usuarioId;
    this.app.usuarioNome = this.sessionApp.dados.usuarioNome;
    this.app.token = this.sessionApp.token;

    this.CarregarTiposUsuario();
    this.ResponsividadeHelper();
  }

  ResponsividadeHelper() {
    const breakpoint = this.$vuetify.breakpoint.name;
    if (breakpoint === "sm" || breakpoint === "xs") {
      this.isMobile = true;
      this.isMedium = false;
      this.isLarge = false;
    }

    if (breakpoint === "md") {
      this.isMobile = false;
      this.isMedium = true;
      this.isLarge = false;
    }

    if (breakpoint === "lg" || breakpoint === "xl") {
      this.isMobile = false;
      this.isMedium = false;
      this.isLarge = true;
    }
  }

  CarregarTiposUsuario() {
    if (this.app.tipoId === 1) {
      this.isAdmin = true;
      this.isDentista = false;
      this.isCliente = false;
      this.isRecepcionista = false;
    }

    if (this.app.tipoId === 2) {
      this.isAdmin = false;
      this.isDentista = false;
      this.isCliente = false;
      this.isRecepcionista = true;
    }

    if (this.app.tipoId === 3) {
      this.isAdmin = false;
      this.isDentista = false;
      this.isCliente = true;
      this.isRecepcionista = false;
    }

    if (this.app.tipoId === 4) {
      this.isAdmin = false;
      this.isDentista = true;
      this.isCliente = false;
      this.isRecepcionista = false;
    }
  }
}
