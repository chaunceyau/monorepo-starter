import { Type } from '@nestjs/common';
import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(_type => String)
    cursor: string;

    @Field(_type => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginationPageInfo {
    @Field(_type => Boolean)
    hasNextPage: boolean;

    @Field(_type => Boolean)
    hasPreviousPage: boolean;

    @Field(_type => String)
    startCursor: string;

    @Field(_type => String)
    endCursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(_type => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(_type => [classRef], { nullable: true })
    nodes: T[];

    @Field(_type => PaginationPageInfo)
    pageInfo: PaginationPageInfo;
  }
  return PaginatedType;
}

@InputType({ isAbstract: true })
export class ConnectionArguments implements ConnectionArguments {
  @Field(_type => Int, { nullable: true })
  first?: number;
  @Field(_type => String, { nullable: true })
  after?: string;
  @Field(_type => Int, { nullable: true })
  last?: number;
  @Field(_type => String, { nullable: true })
  before?: string;
}

export function getPaginationArgs(input) {
  let skip: Prisma.UserFindManyArgs['skip'] = 0;
  let take: Prisma.UserFindManyArgs['take'] | undefined;
  let cursor: Prisma.UserFindManyArgs['cursor'] | undefined;

  if (input.first) {
    // plus one so we know if hasNextPage
    take = input.first + 1;
    if (typeof input.after === 'string') {
      cursor = { id: input.after };
      skip = 1;
    }
  } else if (input.last) {
    // subtract one so we know if hasPreviousPage
    take = -input.last - 1;
    if (typeof input.before === 'string') {
      cursor = { id: input.before };
      skip = 1;
    }
  }

  return { take, cursor, skip };
}
