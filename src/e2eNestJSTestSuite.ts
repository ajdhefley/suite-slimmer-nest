import { INestApplication } from '@nestjs/common';
import { MockMapper, TestSuite } from 'suite-slimmer';
import { e2eNestJSTestStrategy } from './e2eNestJSTestStrategy';

export class e2eNestJSTestSuite extends TestSuite<INestApplication> {
    constructor(name: string, excludeOthers: boolean = false) {
        super(name, excludeOthers);
    }

    protected override async initializeTest(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]) {
        let strategy = new e2eNestJSTestStrategy();
        return strategy.initialize(mockMapper, declarations, imports, providers);
    }

    protected override async initializeTests(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]) {
        
    }

    protected override async disposeTests(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]) {

    }
}
