import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser } from '../entities/social-user';

declare let FB: any;

export class FacebookLoginProvider extends BaseLoginProvider {
  public static readonly PROVIDER_ID: string = 'FACEBOOK';

  constructor(
    private clientId: string,
    private initOptions: any = {
      scope: 'email,public_profile',
      locale: 'en_US',
      fields: 'name,email,picture,first_name,last_name',
      version: 'v4.0',
    }
  ) {
    super();
  }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.loadScript(
          FacebookLoginProvider.PROVIDER_ID,
          `//connect.facebook.net/${this.initOptions.locale}/sdk.js`,
          () => {
            FB.init({
              appId: this.clientId,
              autoLogAppEvents: true,
              cookie: true,
              xfbml: true,
              version: this.initOptions.version,
            });

            resolve();
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  getLoginStatus(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response: any) => {
        if (response.status === 'connected') {
          let authResponse = response.authResponse;
          FB.api(`/me?fields=${this.initOptions.fields}`, (fbUser: any) => {
            let user: SocialUser = new SocialUser();

            user.id = fbUser.id;
            user.name = fbUser.name;
            user.email = fbUser.email;
            user.photoUrl =
              'https://graph.facebook.com/' +
              fbUser.id +
              '/picture?type=normal';
            user.firstName = fbUser.first_name;
            user.lastName = fbUser.last_name;
            user.authToken = authResponse.accessToken;

            user.response = fbUser;

            resolve(user);
          });
        } else {
          reject(`No user is currently logged in with ${FacebookLoginProvider.PROVIDER_ID}`);
        }
      });
    });
  }

  signIn(signInOptions?: any): Promise<SocialUser> {
    const options = { ...this.initOptions, ...signInOptions };
    return new Promise((resolve, reject) => {
      FB.login((response: any) => {
        if (response.authResponse) {
          let authResponse = response.authResponse;
          FB.api(`/me?fields=${options.fields}`, (fbUser: any) => {
            let user: SocialUser = new SocialUser();

            user.id = fbUser.id;
            user.name = fbUser.name;
            user.email = fbUser.email;
            user.photoUrl =
              'https://graph.facebook.com/' +
              fbUser.id +
              '/picture?type=normal';
            user.firstName = fbUser.first_name;
            user.lastName = fbUser.last_name;
            user.authToken = authResponse.accessToken;

            user.response = fbUser;

            resolve(user);
          });
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, options);
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.logout((response: any) => {
        resolve();
      });
    });
  }
}
