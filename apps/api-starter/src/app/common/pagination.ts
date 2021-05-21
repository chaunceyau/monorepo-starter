import { Type } from '@nestjs/common';
import { Field, ObjectType, Int } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(_type => String)
    cursor: string;

    @Field(_type => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(_type => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(_type => [classRef], { nullable: true })
    nodes: T[];

    @Field(_type => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType;
}
