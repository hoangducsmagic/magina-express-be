import { PluginSpecificConfiguration } from '@hapi/hapi';

export enum AppRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Employee = 'Employee'
}

export const enum Module {
  User = 'User',
  Company = 'Company',
  Department = 'Department',
  Position = 'Position',
  Candidate = 'Candidate',
  Role = 'Role',
  FormTemplate = 'FormTemplate',
  Form = 'Form',
  Workflow = 'Workflow',
  Cronjob = 'Cronjob',
  ApiKey = 'ApiKey'
}

export const enum Action {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  Share = 'Share',
  Get = 'Get',
  GetProfile = 'GetProfile',
  UpdateProfile = 'UpdateProfile',
  GetList = 'GetList',
  InviteOnboardee = 'InviteOnboardee',
  InviteOnboarder = 'InviteOnboarder',
  GetMyCompanies = 'GetMyCompanies',
  Submit = 'Submit',
  SaveDraft = 'SaveDraft',
  GetUserDocuments = 'GetUserDocuments',
  UpdateStage = 'UpdateStage',
  DeleteOverdueProfiles = 'DeleteOverdueProfiles',
  GetFormsOfUser = 'GetFormsOfUser',
  GetUserDetails = 'GetUserDetails',
  CopyFile = 'CopyFile'
}

export const Scope = {
  [Module.User]: {
    [Action.GetProfile]: {
      value: 'GetProfile.User',
      roles: [AppRole.SuperAdmin, AppRole.Admin, AppRole.Employee]
    },
    [Action.UpdateProfile]: {
      value: 'UpdateProfile.User',
      roles: [AppRole.Employee]
    },
    [Action.Create]: {
      value: 'Create.User',
      roles: [AppRole.Admin]
    },
    [Action.GetList]: {
      value: 'GetList.User',
      roles: [AppRole.Admin]
    },
    [Action.InviteOnboardee]: {
      value: 'InviteOnboardee.User',
      roles: [AppRole.Admin]
    },
    [Action.InviteOnboarder]: {
      value: 'InviteOnboarder.User',
      roles: [AppRole.Admin]
    },
    [Action.GetMyCompanies]: {
      value: 'GetMyCompanies.User',
      roles: [AppRole.Admin, AppRole.Employee]
    },
    [Action.GetUserDocuments]: {
      value: 'GetUserDocuments.User',
      roles: [AppRole.Admin, AppRole.Employee]
    },
    [Action.Delete]: {
      value: 'Delete.User',
      roles: [AppRole.Admin, AppRole.Employee]
    },
    [Action.UpdateStage]: {
      value: 'UpdateStage.User',
      roles: [AppRole.Admin]
    },
    [Action.GetFormsOfUser]: {
      value: 'GetFormsOfUser.User',
      roles: [AppRole.Admin, AppRole.Employee]
    },
    [Action.GetUserDetails]: {
      value: 'GetUserDetails.User',
      roles: [AppRole.Admin, AppRole.Employee]
    },
    [Action.CopyFile]: {
      value: 'CopyFile.User',
      roles: [AppRole.Admin, AppRole.Employee]
    }
  },
  [Module.Company]: {
    [Action.Create]: {
      value: 'Create.Company',
      roles: [AppRole.SuperAdmin]
    },
    [Action.GetList]: {
      value: 'GetList.Company',
      roles: [AppRole.SuperAdmin]
    },
    [Action.Get]: {
      value: 'Get.Company',
      roles: [AppRole.SuperAdmin, AppRole.Admin]
    },
    [Action.Delete]: {
      value: 'Delete.Company',
      roles: [AppRole.SuperAdmin]
    },
    [Action.Update]: {
      value: 'Update.Company',
      roles: [AppRole.SuperAdmin, AppRole.Admin]
    }
  },
  [Module.ApiKey]: {
    [Action.Create]: {
      value: 'Create.ApiKey',
      roles: [AppRole.Admin]
    },
    [Action.Update]: {
      value: 'Update.ApiKey',
      roles: [AppRole.Admin]
    }
  },
  [Module.Candidate]: {
    [Action.GetList]: {
      value: 'GetList.Candidate',
      roles: [AppRole.Admin]
    }
  },
  [Module.Position]: {
    [Action.GetList]: {
      value: 'GetList.Position',
      roles: [AppRole.Admin]
    },
    [Action.Create]: {
      value: 'Create.Position',
      roles: [AppRole.Admin]
    },
    [Action.Delete]: {
      value: 'Delete.Position',
      roles: [AppRole.Admin]
    },
    [Action.Update]: {
      value: 'Update.Position',
      roles: [AppRole.Admin]
    }
  },
  [Module.Department]: {
    [Action.GetList]: {
      value: 'GetList.Department',
      roles: [AppRole.Admin]
    },
    [Action.Create]: {
      value: 'Create.Department',
      roles: [AppRole.Admin]
    },
    [Action.Delete]: {
      value: 'Delete.Department',
      roles: [AppRole.Admin]
    },
    [Action.Update]: {
      value: 'Update.Department',
      roles: [AppRole.Admin]
    },
    [Action.GetUserDetails]: {
      value: 'GetUserDetails.User',
      roles: [AppRole.Admin, AppRole.Employee]
    }
  },
  [Module.Role]: {
    [Action.GetList]: {
      value: 'GetList.Role',
      roles: [AppRole.Admin]
    }
  },
  [Module.FormTemplate]: {
    [Action.Create]: {
      value: 'Create.FormTemplate',
      roles: [AppRole.Admin]
    },
    [Action.GetList]: {
      value: 'GetList.FormTemplate',
      roles: [AppRole.Admin]
    },
    [Action.Update]: {
      value: 'Update.FormTemplate',
      roles: [AppRole.Admin]
    },
    [Action.Get]: {
      value: 'Get.FormTemplate',
      roles: [AppRole.Admin]
    },
    [Action.Delete]: {
      value: 'Delete.FormTemplate',
      roles: [AppRole.Admin]
    },
    [Action.Share]: {
      value: 'Share.FormTemplate',
      roles: [AppRole.Admin]
    }
  },
  [Module.Form]: {
    [Action.Submit]: {
      value: 'Submit.Form',
      roles: [AppRole.Employee]
    },
    [Action.SaveDraft]: {
      value: 'SaveDraft.Form',
      roles: [AppRole.Employee]
    },
    [Action.Get]: {
      value: 'Get.Form',
      roles: [AppRole.Employee, AppRole.Admin]
    }
  },
  [Module.Workflow]: {
    [Action.Update]: {
      value: 'Update.Workflow',
      roles: [AppRole.Admin]
    }
  },
  [Module.Cronjob]: {
    [Action.DeleteOverdueProfiles]: {
      value: 'DeleteOverdueProfiles.Cronjob',
      roles: [AppRole.SuperAdmin]
    }
  }
} as const;

export type ActionValue = {
  value: string;
  roles: readonly AppRole[];
};
export type Scope = Record<
  keyof typeof Module,
  {
    [key in keyof typeof Action]?: ActionValue;
  }
>;

export const ScopeData = Scope as Scope;

export interface IConfiguration extends PluginSpecificConfiguration {
  ignoreProfileToken: boolean;
}

export enum PlatformLanguage {
  English = 'en',
  French = 'fr',
  Spanish = 'es'
}
