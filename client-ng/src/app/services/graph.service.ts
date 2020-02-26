import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import ApolloClient from 'apollo-client';
import createClientGraph, { Client } from 'generated/graph';

let proxy: Client | null = null;

export const getProxy = () => proxy;

@Injectable({
  providedIn: 'root',
})
export class GraphService {

  public client: ApolloClient<any>;
  private proxy: Client;

  constructor(
    public apollo: Apollo,
  ) {
    this.client = apollo.getClient();

    this.proxy = createClientGraph(this.client, {
    });

    proxy = this.proxy;
  }

  get query() {
    return this.proxy.query;
  }

  get refetchQuery() {
    return this.proxy.refetchQuery;
  }

  get mutation() {
    return this.proxy.mutation;
  }

  get watchQuery() {
    return this.proxy.watchQuery;
  }

}
