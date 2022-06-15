import {service as authService} from "../authService";
import User from "../user";

describe('Authentication Service', ()=>{
    const tempUser = new User('test1243', 'test@example.com', 'testjwtaccess', 'testjwtrefresh');
    describe('when reloading the user from Storage', ()=>{


        test('if there is a user set in local storage but not session storage it uses this user', ()=>{
            localStorage.setItem('current_user', JSON.stringify(tempUser));

            authService.loadFromStorage()

            expect(authService.current_user).toStrictEqual(tempUser)
        });

        test('if there is a user set in session storage it uses that user', ()=>{
            const tempUserWrong = new User('test12434', 'test2@example.com', 'testjwtaccess2', 'testjwtrefresh2')
            
            sessionStorage.setItem('current_user', JSON.stringify(tempUser));
            localStorage.setItem('current_user', JSON.stringify(tempUserWrong))

            authService.loadFromStorage()

            expect(authService.current_user).toStrictEqual(tempUser);
        });


    });

    describe('when a user logs out', ()=> {
        test('the current user is set to undefined', () => {
            authService.current_user = tempUser;

            authService.logout();

            expect(authService.current_user).toBeUndefined();
        });

        test('the local user storage is cleared', () => {
            authService.current_user = tempUser;
            authService.remember = true;
            authService.saveToStorage();

            authService.logout();

            expect(localStorage.getItem('current_user')).toBeNull();
        });

        test('the session user storage is cleared', () => {
            authService.current_user = tempUser;
            authService.remember = false;
            authService.saveToStorage();

            authService.logout();

            expect(sessionStorage.getItem('current_user')).toBeNull();
        });
    });
});