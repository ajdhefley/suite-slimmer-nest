import { MockMapper } from 'suite-slimmer';

export abstract class BaseTestStrategy<T> {
    public abstract initialize(mockMapper: MockMapper, declarations: any[], imports: any[], providers: any[]): Promise<T>;
}