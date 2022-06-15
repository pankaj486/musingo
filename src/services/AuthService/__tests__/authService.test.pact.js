import {like, term} from '@pact-foundation/pact/dsl/matchers';


import {service as authService} from '../authService';

describe('Authentication Service', () => {
    const contentTypeJsonMatcher = term({
        matcher: 'application\\/json; *charset=utf-8',
        generate: 'application/json; charset=utf-8'
    });

    const jwTokenMatcher = term({
        matcher: '^[A-Za-z0-9_=-]+\\.[A-Za-z0-9_=-]+\\.?[A-Za-z0-9_.+/=-]*$',
        generate: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    });

    const authorizationMatcher = term({
        matcher: '^JWT [A-Za-z0-9_=-]+\\.[A-Za-z0-9_=-]+\\.?[A-Za-z0-9_.+/=-]*$',
        generate: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    });

    const uidMatcher = term({
        matcher: '[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}',
        generate: '50157041-7dea-4e52-8a69-b4706bf3ed22',
    });

    //(1) Create the Pact object to represent your provider
    describe('When a request to register a new user is made', () => {
        describe('and is correct', () => {


            beforeAll((done) => {
                Promise.all([
                    global.provider.addInteraction({
                        uponReceiving: 'a POST request to register a new user',
                        withRequest: {
                            path: '/auth/user/',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: like({
                                email: 'murphy@example.com',
                                password: 'Murphdxy123'
                            })
                        },
                        willRespondWith: {
                            status: 201,
                            headers: {
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: {
                                email: like('murphy@example.com'),
                                id: uidMatcher
                            },
                        },
                    }),
                    global.provider.addInteraction({
                        state: 'There is an user with email murphy@example.com and password Murphdxy123',
                        uponReceiving: 'A post request for the user murphy@example.com to generate an new pair of JSON Web Token',
                        withRequest: {
                            path: '/auth/jwt/create/',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: like({
                                email: 'murphy@example.com',
                                password: 'Murphdxy123'
                            })
                        },
                        willRespondWith: {
                            status: 200,
                            headers: {
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: {
                                access: jwTokenMatcher,
                                refresh: jwTokenMatcher
                            }
                        }
                    }),
                    global.provider.addInteraction({
                        state: 'There is a logged in user',
                        uponReceiving: 'A get request to get current user information',
                        withRequest: {
                            path: '/auth/user/',
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Authorization': authorizationMatcher,
                            }
                        },
                        willRespondWith: {
                            status: 200,
                            headers: {
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: {
                                id: uidMatcher,
                                email: like('murphy@example.com')
                            }
                        }
                    })
                ]).then(() => done());
            });

            test('then the service returns a new user object and logs in', (done) => {
                authService.registerUser('murphy@example.com', 'Murphdxy123').then(
                    (user) => {
                        expect(user.id).toBe('50157041-7dea-4e52-8a69-b4706bf3ed22')
                        expect(user.email).toBe('murphy@example.com')
                        expect(user.jwt_access).toBe(jwTokenMatcher.data['generate'])
                        expect(user.jwt_refresh).toBe(jwTokenMatcher.data['generate'])
                        expect(authService.current_user).toBe(user)
                    },
                    (error) => fail(error)).then(done)
            });


        });
    });

    describe('when a user tries to log in', () => {
        describe('and enters the correct credentials', () => {
            beforeEach((done) => {
                Promise.all([
                    global.provider.addInteraction({
                        state: 'There is an user with email murphy@example.com and password Murphdxy123',
                        uponReceiving: 'A post request for the user murphy@example.com to generate an new pair of JSON Web Token',
                        withRequest: {
                            path: '/auth/jwt/create/',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: like({
                                email: 'murphy@example.com',
                                password: 'Murphdxy123'
                            })
                        },
                        willRespondWith: {
                            status: 200,
                            headers: {
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: {
                                access: jwTokenMatcher,
                                refresh: jwTokenMatcher
                            }
                        }
                    }),
                    global.provider.addInteraction({
                        state: 'There is a logged in user',
                        uponReceiving: 'A get request to get current user information',
                        withRequest: {
                            path: '/auth/user/',
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Authorization': authorizationMatcher,
                            }
                        },
                        willRespondWith: {
                            status: 200,
                            headers: {
                                'Content-Type': contentTypeJsonMatcher
                            },
                            body: {
                                id: uidMatcher,
                                email: like('murphy@example.com')
                            }
                        }
                    })]).then(()=> done());
            });

            test('then the service sets the current user with a fresh set of jwt tokens', (done) => {
                authService.login('murphy@example.com', 'Murphdxy123', true).then(
                    (user) => {
                        expect(user).toBe(authService.current_user);
                        expect(user.jwt_access).toBe(jwTokenMatcher.data['generate'])
                        expect(user.jwt_refresh).toBe(jwTokenMatcher.data['generate'])
                    },
                    (error) => fail(error)
                ).then(done)
            });
            
            describe('if the user wants to be remembered', () => 
            {
                test('then the service saves the user in localStorage and wipes sessionStorage', (done) =>
                {
                    sessionStorage.setItem('user', 'something');
                    authService.login('murphy@example.com', 'Murphdxy123', true).then(
                        (user) => {
                            expect(localStorage.getItem('current_user')).toBe(JSON.stringify(user));
                            expect(sessionStorage.getItem('current_user')).toBeNull();
                            expect(authService.is_logged_in()).toBe(true);
                        },
                        (error) => fail(error)
                    ).then(done)
                });
            });
            describe('if the user does not want to be remembered', () =>
            {
                test('then the service saves the user in sessionStorage and wipes localStorage', (done) =>
                {
                    authService.login('murphy@example.com', 'Murphdxy123', false).then(
                        (user) => {
                            expect(sessionStorage.getItem('current_user')).toBe(JSON.stringify(user))
                            expect(localStorage.getItem('current_user')).toBeNull();
                            expect(authService.is_logged_in()).toBe(true);
                        },
                        (error) => fail(error)
                    ).then(done)
                });
            });
        });
    });

    afterEach((done) => provider.verify().then(() => done()));
});