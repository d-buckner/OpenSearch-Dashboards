/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { SavedObjectsType } from 'opensearch-dashboards/server';

export const querySavedObjectType: SavedObjectsType = {
  name: 'query',
  hidden: false,
  namespaceType: 'single',
  management: {
    icon: 'search',
    defaultSearchField: 'title',
    importableAndExportable: true,
    getTitle(obj) {
      return obj.attributes.title;
    },
    getInAppUrl(obj) {
      return {
        path: `/app/discover#/?_a=(savedQuery:'${encodeURIComponent(obj.id)}')`,
        uiCapabilitiesPath: 'discover.show',
      };
    },
  },
  mappings: {
    properties: {
      title: { type: 'text' },
      description: { type: 'text' },
      isTemplate: { type: 'boolean' },
      query: {
        properties: {
          language: { type: 'keyword' },
          query: { type: 'keyword', index: false },
          dataset: {
            type: 'object',
            properties: {
              id: { type: 'text' },
              title: { type: 'text' },
              type: { type: 'text' },
              timeFieldName: { type: 'text' },
              language: { type: 'text' },
              dataSource: {
                type: 'object',
                properties: {
                  id: { type: 'text' },
                  title: { type: 'text' },
                  type: { type: 'text' },
                  meta: {
                    type: 'object',
                    properties: {
                      name: { type: 'text' },
                      sessionId: { type: 'text' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      filters: { type: 'object', enabled: false },
      timefilter: { type: 'object', enabled: false },
    },
  },
  migrations: {},
};
