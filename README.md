# suite-slimmer-nest &nbsp; ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dwyl/auth_plug/Elixir%20CI?label=build&style=flat-square) &nbsp; [![Node version](https://img.shields.io/npm/v/suite-slimmer-nest.svg?style=flat)](http://nodejs.org/download/)

Streamlines NestJS testing.

* Encapsulates test module setup, reducing code duplication and boilerplate
* Injects tested class and mocked dependencies directly into each test, no need for managing global variables
* Mocks and spies on dependencies dynamically so you don't have to do it yourself
* Easily phased into existing projects with no additional configuration required

## Usage

Install the npm package.

```
npm install --save-dev suite-slimmer-nest
```

Instantiate the framework suite (`NestJSTestSuite` or `e2eNestJSTestSuite`), providing the type of the class you are testing as a required argument for non-e2e tests.

```
new NestJSTestSuite(MyExampleController)
```

On this object, the following methods available and can be chained:

* addImports
* addDeclarations
* addProviders
* addMocks
* addTest
* beforeEach
* afterEach
* run

No special configuration is required. As long as your tests are configured under Jest, they will run with suite-slimmer.

### Examples

__Before:__

```
describe('AppController', () => {
    let appController: AppController;
    let service: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
            {
                provide: AppService,
                useValue: {
                    isOvenOn: jest.fn().mockReturnValue(true),
                    putCookiesInOven: jest.fn().mockReturnValue(10),
                },
            },
        ],
        }).compile();

        appController = app.get<AppController>(AppController);
        service = app.get<AppService>(AppService);
    });

    it('should bake cookies', () => {
        appController.bakeCookies().subscribe({
            ...
        });
    });
});
```

__After:__

```
new NestJSTestSuite(AppController)
    .addMocks(AppService)
    .beforeEach((controller, mocks) => {
        mocks.get(AppService).isOvenOn.mockReturnValue(true);
        mocks.get(AppService).putCookiesInOven.mockReturnValue(10);
    })
    .addTest('should bake cookies', (controller) => {
        controller.bakeCookies().subscribe({
            ...
        });
    })
    .run()
```
