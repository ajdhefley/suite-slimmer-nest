import { INestApplication } from '@nestjs/common';
import { TestMockMapper, TestSuite } from 'suite-slimmer';
import { JestMocker } from './jest-mocker';
import { e2eNestJSTestStrategy } from './nestjs-e2e-test-strategy';

export class e2eNestJSTestSuite extends TestSuite<INestApplication> {
    constructor(name: string, excludeOthers: boolean = false) {
        super(new JestMocker(), name, excludeOthers);
    }

    protected override async initializeTest(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]) {
        let strategy = new e2eNestJSTestStrategy();
        return strategy.initialize(mockMapper, declarations, imports, providers);
    }

    protected override async initializeTests(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]) {
        
    }

    protected override async disposeTests(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]) {

    }
}
