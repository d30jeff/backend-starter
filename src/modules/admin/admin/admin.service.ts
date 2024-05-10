import { Admin } from '@modules/admin/admin/admin.interface';
import { CustomLogger, Logger } from '@providers/logger.provider';
import {
  AdminPublicSelect,
  AdminRepository,
} from '@repositories/admin.repository';
import { EmailService } from '@services/email/email.service';
import { FirebaseService } from '@services/firebase/firebase.service';
import { Bcrypt } from '@utils/bcrypt.util';
import { Service } from 'typedi';

@Service()
export class AdminService implements Admin.Interface {
  @Logger()
  private readonly logger: CustomLogger;

  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly firebaseService: FirebaseService,
    private readonly emailService: EmailService
  ) {}

  async initialize() {}

  async findByID(ID: string) {
    return this.adminRepository.findFirst<AdminPublicSelect>({
      select: AdminPublicSelect,
      where: {
        ID,
      },
    });
  }

  async findByEmail(email: string) {
    return this.adminRepository.findFirst<AdminPublicSelect>({
      select: AdminPublicSelect,
      where: {
        email,
      },
    });
  }

  async create(params: Admin.Create.Params) {
    const {} = params;
  }

  async signIn(params: Admin.SignIn.Params) {
    const { email, password } = params;

    const admin = await this.findByEmail(email);

    if (
      !admin ||
      (await Bcrypt.ComparePasswords(password, admin.passwordHash)) === false
    ) {
      throw new Admin.Exceptions.InvalidCredentials();
    }

    return admin;
  }

  recover(params: Admin.Recover.Params): void {
    // TODO: Check if there's existing request
  }

  reset(params: Admin.Reset.Params): void {}
}
