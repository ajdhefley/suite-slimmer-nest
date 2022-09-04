

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestMockMapper } from 'slim-suite';
import { BaseTestStrategy } from './base-test-strategy';

export class e2eNestJSTestStrategy extends BaseTestStrategy<INestApplication> {
    public override async initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]) {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports,
            providers
        }).compile();

        let app = moduleFixture.createNestApplication();
        return await app.init();
    }
}
