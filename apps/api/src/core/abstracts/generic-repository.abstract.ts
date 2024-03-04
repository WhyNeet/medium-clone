export abstract class IGenericRepository<Entity> {
  abstract getAll(): Promise<Entity[]>;

  abstract get(id: string): Promise<Entity | null>;

  abstract create(entity: Entity): Promise<Entity>;

  abstract update(id: string, entity: Entity): Promise<Entity | null>;

  abstract delete(id: string): Promise<Entity | null>;
}
