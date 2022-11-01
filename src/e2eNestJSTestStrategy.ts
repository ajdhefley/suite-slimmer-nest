

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMapper } from 'suite-slimmer';
import { BaseTestStrategy } from './BaseTestStrategy';

export class e2eNestJSTestStrategy extends BaseTestStrategy<INestApplication> {
    public override async initialize(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]) {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports,
            providers
        }).compile();

        let app = moduleFixture.createNestApplication();
        return await app.init();
    }
}
