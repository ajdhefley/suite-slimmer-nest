import { Test, TestingModule } from '@nestjs/testing';
import { MockMapper } from 'suite-slimmer';
import { BaseTestStrategy } from './base-test-strategy';

export class NestJSTestStrategy<T> extends BaseTestStrategy<T> {
    constructor(readonly classType: any) {
        super();
    }

    public override async initialize(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]) {
        const app: TestingModule = await Test.createTestingModule({
            imports: imports,
            providers: providers.concat([this.classType])
        }).compile();

        return app.get<T>(this.classType);
    }
}
