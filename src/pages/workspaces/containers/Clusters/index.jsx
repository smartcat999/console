/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { observer, inject } from 'mobx-react'
import Banner from 'components/Cards/Banner'

import ClusterMonitorStore from 'stores/monitoring/cluster'

import Card from './Card'

@inject('rootStore', 'workspaceStore')
@observer
class BaseInfo extends React.Component {
  monitorStore = new ClusterMonitorStore()

  state = {
    confirm: false,
    workspaces: {},
  }

  get store() {
    return this.props.workspaceStore
  }

  get module() {
    return 'BaseInfo'
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get tips() {
    return [
      {
        title: t('HOW_TO_APPLY_MORE_CLUSTER_Q'),
        description: t('HOW_TO_APPLY_MORE_CLUSTER_A'),
      },
    ]
  }

  renderClusters() {
    if (!globals.app.isMultiCluster) {
      return null
    }

    return this.store.clusters.data.map(cluster => (
      <Card key={cluster.name} cluster={cluster} />
    ))
  }

  render() {
    return (
      <div>
        <Banner
          title={t('Clusters Info')}
          icon="cluster"
          description={t('WORKSPACE_CLUSTERS_DESC')}
          tips={this.tips}
          module={this.module}
        />
        {this.renderClusters()}
      </div>
    )
  }
}

export default BaseInfo
