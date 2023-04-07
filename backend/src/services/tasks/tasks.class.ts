// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Tasks, TasksData, TasksPatch, TasksQuery } from './tasks.schema'

export type { Tasks, TasksData, TasksPatch, TasksQuery }

export interface TasksParams extends MongoDBAdapterParams<TasksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TasksService<ServiceParams extends Params = TasksParams> extends MongoDBService<
  Tasks,
  TasksData,
  TasksParams,
  TasksPatch
> {
  // TODO: need to use right types
  async find(params: any) {
    const { user } = params
    const query = { userId: user._id }
    const result = (await this._find({ ...params, query })) as any
    return result
  }

  async get(id: string, params: any) {
    const { user } = params
    const query = { _id: id, userId: user._id }
    return super.get(id, { ...params, query })
  }

  async update(id: string, params: any) {
    const { user } = params
    const query = { _id: id, userId: user._id }
    return super.update(id, { ...params, query })
  }

  async patch(id: any, data: any, params: any): Promise<any> {
    const { user } = params
    const query = { _id: id, userId: user._id }
    return super.patch(id, data, { ...params, query })
  }

  async remove(id: any, params: any): Promise<any> {
    const { user } = params
    const query = { _id: id, userId: user._id }
    return super.remove(id, { ...params, query })
  }

  async create(data: any, params: any): Promise<any> {
    const { user } = params
    const taskData = { ...data, userId: user._id }
    return super.create(taskData, params)
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('tasks'))
  }
}
