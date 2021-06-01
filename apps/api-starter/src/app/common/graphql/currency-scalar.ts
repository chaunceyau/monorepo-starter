import { Scalar, CustomScalar, Int } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Currency', _type => Int)
export class CurrencyScalar implements CustomScalar<number, number> {
  description = 'Measured in USD cents returned as Int';

  parseValue(value: number): number {
    return value; // value from the client
  }

  serialize(value: number): number {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value);
    }
    return null;
  }
}
