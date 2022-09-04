import { TestMockMapper, TestSuite } from 'slim-suite';
import { NestJSTestStrategy } from './nestjs-test-strategy';

type Class<T> = new (...args: any[]) => T;

export class NestJSTestSuite<T> extends TestSuite<T> {
    constructor(readonly classType: Class<T>, excludeOthers: boolean = false) {
        super(classType.name, excludeOthers);
    }

    protected override async initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]) {
        let strategy = new NestJSTestStrategy<T>(this.classType);
        return await strategy.initialize(mockMapper, declarations, imports, providers);
    }

    protected override async initializeTests(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]): Promise<void> {
        
    }
}
