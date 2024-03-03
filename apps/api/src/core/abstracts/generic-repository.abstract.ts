export abstract class IGenericRepository<Entity, Id> {
  abstract getAll(): Promise<Entity[]>;

  abstract get(id: Id): Promise<Entity | null>;

  abstract create(entity: Entity): Promise<Entity>;

  abstract update(id: Id, entity: Entity): Promise<Entity | null>;

  abstract delete(id: Id): Promise<Entity | null>;
}
