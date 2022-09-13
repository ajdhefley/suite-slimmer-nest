import { DependencyMocker } from 'suite-slimmer';

export type JestMockOf<T> = T & {
    [k in keyof T]: jest.Mock;
}

export class JestMocker extends DependencyMocker {
    public override mockService<T>(serviceType: new (...args: any[]) => T): JestMockOf<T> {
        const res: JestMockOf<T> = {} as any;
    
        // Each function will be mocked to return an empty
        // observable by default but this can be overriden.
        Object.getOwnPropertyNames(serviceType.prototype)
            .filter((key) => key != 'constructor')
            .forEach((key) => {
                res[key] = jest.fn().mockReturnValue({});
            });
    
        return res;
    }
    
    public override mockObject<T>(objectType: new (...args: any[]) => T, overrideProperties?: any): T {
        let object = new objectType();
    
        for (let propertyName in overrideProperties) {
            object[propertyName] = overrideProperties[propertyName];
        }
    
        return object;
    }
}