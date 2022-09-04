import { TestMockMapper } from 'slim-suite';

export abstract class BaseTestStrategy<T> {
    public abstract initialize(mockMapper: TestMockMapper, declarations: any[], imports: any[], providers: any[]): Promise<T>;
}