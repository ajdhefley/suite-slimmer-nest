# suite-slimmer-nest

Eliminates boilerplate code for NestJS test files, making them much simpler and smaller.

* Provides an elegant method-chaining API
* Encapsulates test module setup
* Streamlines dependency mocking by generating providers and replacing functions with spies behind the scenes
* Reduces the amount of test code that needs to be written, read, and maintained
* Can easily be introduced into existing projects without disruption

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
