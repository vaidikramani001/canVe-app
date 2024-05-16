import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

      export type MethodDecoratorOverrideFn = (decorators: MethodDecorator[]) => MethodDecorator[];

const crudResolversMap = {
        Document: crudResolvers.DocumentCrudResolver,
        User: crudResolvers.UserCrudResolver
    };
const actionResolversMap = {
        Document: {
            aggregateDocument: actionResolvers.AggregateDocumentResolver,
            createManyDocument: actionResolvers.CreateManyDocumentResolver,
            createOneDocument: actionResolvers.CreateOneDocumentResolver,
            deleteManyDocument: actionResolvers.DeleteManyDocumentResolver,
            deleteOneDocument: actionResolvers.DeleteOneDocumentResolver,
            findFirstDocument: actionResolvers.FindFirstDocumentResolver,
            findFirstDocumentOrThrow: actionResolvers.FindFirstDocumentOrThrowResolver,
            documents: actionResolvers.FindManyDocumentResolver,
            document: actionResolvers.FindUniqueDocumentResolver,
            getDocument: actionResolvers.FindUniqueDocumentOrThrowResolver,
            groupByDocument: actionResolvers.GroupByDocumentResolver,
            updateManyDocument: actionResolvers.UpdateManyDocumentResolver,
            updateOneDocument: actionResolvers.UpdateOneDocumentResolver,
            upsertOneDocument: actionResolvers.UpsertOneDocumentResolver
        },
        User: {
            aggregateUser: actionResolvers.AggregateUserResolver,
            createManyUser: actionResolvers.CreateManyUserResolver,
            createOneUser: actionResolvers.CreateOneUserResolver,
            deleteManyUser: actionResolvers.DeleteManyUserResolver,
            deleteOneUser: actionResolvers.DeleteOneUserResolver,
            findFirstUser: actionResolvers.FindFirstUserResolver,
            findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
            users: actionResolvers.FindManyUserResolver,
            user: actionResolvers.FindUniqueUserResolver,
            getUser: actionResolvers.FindUniqueUserOrThrowResolver,
            groupByUser: actionResolvers.GroupByUserResolver,
            updateManyUser: actionResolvers.UpdateManyUserResolver,
            updateOneUser: actionResolvers.UpdateOneUserResolver,
            upsertOneUser: actionResolvers.UpsertOneUserResolver
        }
    };
const crudResolversInfo = {
        Document: ["aggregateDocument", "createManyDocument", "createOneDocument", "deleteManyDocument", "deleteOneDocument", "findFirstDocument", "findFirstDocumentOrThrow", "documents", "document", "getDocument", "groupByDocument", "updateManyDocument", "updateOneDocument", "upsertOneDocument"],
        User: ["aggregateUser", "createManyUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "findFirstUserOrThrow", "users", "user", "getUser", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"]
    };
const argsInfo = {
        AggregateDocumentArgs: ["where", "orderBy", "cursor", "take", "skip"],
        CreateManyDocumentArgs: ["data", "skipDuplicates"],
        CreateOneDocumentArgs: ["data"],
        DeleteManyDocumentArgs: ["where"],
        DeleteOneDocumentArgs: ["where"],
        FindFirstDocumentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindFirstDocumentOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindManyDocumentArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindUniqueDocumentArgs: ["where"],
        FindUniqueDocumentOrThrowArgs: ["where"],
        GroupByDocumentArgs: ["where", "orderBy", "by", "having", "take", "skip"],
        UpdateManyDocumentArgs: ["data", "where"],
        UpdateOneDocumentArgs: ["data", "where"],
        UpsertOneDocumentArgs: ["where", "create", "update"],
        AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
        CreateManyUserArgs: ["data", "skipDuplicates"],
        CreateOneUserArgs: ["data"],
        DeleteManyUserArgs: ["where"],
        DeleteOneUserArgs: ["where"],
        FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindFirstUserOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
        FindUniqueUserArgs: ["where"],
        FindUniqueUserOrThrowArgs: ["where"],
        GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
        UpdateManyUserArgs: ["data", "where"],
        UpdateOneUserArgs: ["data", "where"],
        UpsertOneUserArgs: ["where", "create", "update"]
    };

      type ResolverModelNames = keyof typeof crudResolversMap;

      type ModelResolverActionNames<
        TModel extends ResolverModelNames
        > = keyof typeof crudResolversMap[TModel]["prototype"];

      export type ResolverActionsConfig<
        TModel extends ResolverModelNames
      > = Partial<Record<ModelResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
        & {
          _all?: MethodDecorator[];
          _query?: MethodDecorator[];
          _mutation?: MethodDecorator[];
        };

      export type ResolversEnhanceMap = {
        [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
      };

      export function applyResolversEnhanceMap(
        resolversEnhanceMap: ResolversEnhanceMap,
      ) {
        const mutationOperationPrefixes = [
          "createOne", "createMany", "deleteOne", "updateOne", "deleteMany", "updateMany", "upsertOne"
        ];
        for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
          const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
          const crudTarget = crudResolversMap[modelName].prototype;
          const resolverActionsConfig = resolversEnhanceMap[modelName]!;
          const actionResolversConfig = actionResolversMap[modelName];
          const allActionsDecorators = resolverActionsConfig._all;
          const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
          for (const resolverActionName of resolverActionNames) {
            const maybeDecoratorsOrFn = resolverActionsConfig[
              resolverActionName as keyof typeof resolverActionsConfig
            ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
            const isWriteOperation = mutationOperationPrefixes.some(prefix => resolverActionName.startsWith(prefix));
            const operationKindDecorators = isWriteOperation ? resolverActionsConfig._mutation : resolverActionsConfig._query;
            const mainDecorators = [
              ...allActionsDecorators ?? [],
              ...operationKindDecorators ?? [],
            ]
            let decorators: MethodDecorator[];
            if (typeof maybeDecoratorsOrFn === "function") {
              decorators = maybeDecoratorsOrFn(mainDecorators);
            } else {
              decorators = [...mainDecorators, ...maybeDecoratorsOrFn ?? []];
            }
            const actionTarget = (actionResolversConfig[
              resolverActionName as keyof typeof actionResolversConfig
            ] as Function).prototype;
            tslib.__decorate(decorators, crudTarget, resolverActionName, null);
            tslib.__decorate(decorators, actionTarget, resolverActionName, null);
          }
        }
      }

      type ArgsTypesNames = keyof typeof argsTypes;

      type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
        keyof typeof argsTypes[TArgsType]["prototype"],
        number | symbol
      >;

      type ArgFieldsConfig<
        TArgsType extends ArgsTypesNames
      > = FieldsConfig<ArgFieldNames<TArgsType>>;

      export type ArgConfig<TArgsType extends ArgsTypesNames> = {
        class?: ClassDecorator[];
        fields?: ArgFieldsConfig<TArgsType>;
      };

      export type ArgsTypesEnhanceMap = {
        [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
      };

      export function applyArgsTypesEnhanceMap(
        argsTypesEnhanceMap: ArgsTypesEnhanceMap,
      ) {
        for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
          const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
          const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
          const typeClass = argsTypes[argsTypeName];
          const typeTarget = typeClass.prototype;
          applyTypeClassEnhanceConfig(
            typeConfig,
            typeClass,
            typeTarget,
            argsInfo[argsTypeName as keyof typeof argsInfo],
          );
        }
      }

      type TypeConfig = {
        class?: ClassDecorator[];
        fields?: FieldsConfig;
      };

      export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

      type FieldsConfig<TTypeKeys extends string = string> = Partial<
        Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
      > & { _all?: PropertyDecorator[] };

      function applyTypeClassEnhanceConfig<
        TEnhanceConfig extends TypeConfig,
        TType extends object
      >(
        enhanceConfig: TEnhanceConfig,
        typeClass: ClassType<TType>,
        typePrototype: TType,
        typeFieldNames: string[]
      ) {
        if (enhanceConfig.class) {
          tslib.__decorate(enhanceConfig.class, typeClass);
        }
        if (enhanceConfig.fields) {
          const allFieldsDecorators = enhanceConfig.fields._all ?? [];
          for (const typeFieldName of typeFieldNames) {
            const maybeDecoratorsOrFn = enhanceConfig.fields[
              typeFieldName
            ] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
            let decorators: PropertyDecorator[];
            if (typeof maybeDecoratorsOrFn === "function") {
              decorators = maybeDecoratorsOrFn(allFieldsDecorators);
            } else {
              decorators = [...allFieldsDecorators, ...maybeDecoratorsOrFn ?? []];
            }
            tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
          }
        }
      }

const modelsInfo = {
        Document: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        User: ["email", "id", "password", "phone_number", "roles", "username"]
    };

      type ModelNames = keyof typeof models;

      type ModelFieldNames<TModel extends ModelNames> = Exclude<
        keyof typeof models[TModel]["prototype"],
        number | symbol
      >;

      type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
        ModelFieldNames<TModel>
      >;

      export type ModelConfig<TModel extends ModelNames> = {
        class?: ClassDecorator[];
        fields?: ModelFieldsConfig<TModel>;
      };

      export type ModelsEnhanceMap = {
        [TModel in ModelNames]?: ModelConfig<TModel>;
      };

      export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
        for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
          const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
          const modelConfig = modelsEnhanceMap[modelName]!;
          const modelClass = models[modelName];
          const modelTarget = modelClass.prototype;
          applyTypeClassEnhanceConfig(
            modelConfig,
            modelClass,
            modelTarget,
            modelsInfo[modelName as keyof typeof modelsInfo],
          );
        }
      }

const outputsInfo = {
        AggregateDocument: ["_count", "_avg", "_sum", "_min", "_max"],
        DocumentGroupBy: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked", "_count", "_avg", "_sum", "_min", "_max"],
        AggregateUser: ["_count", "_avg", "_sum", "_min", "_max"],
        UserGroupBy: ["email", "id", "password", "phone_number", "roles", "username", "_count", "_avg", "_sum", "_min", "_max"],
        AffectedRowsOutput: ["count"],
        DocumentCountAggregate: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked", "_all"],
        DocumentAvgAggregate: ["id", "userId"],
        DocumentSumAggregate: ["id", "userId"],
        DocumentMinAggregate: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentMaxAggregate: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        UserCountAggregate: ["email", "id", "password", "phone_number", "roles", "username", "_all"],
        UserAvgAggregate: ["id", "phone_number"],
        UserSumAggregate: ["id", "phone_number"],
        UserMinAggregate: ["email", "id", "password", "phone_number", "roles", "username"],
        UserMaxAggregate: ["email", "id", "password", "phone_number", "roles", "username"]
    };

      type OutputTypesNames = keyof typeof outputTypes;

      type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
        keyof typeof outputTypes[TOutput]["prototype"],
        number | symbol
      >;

      type OutputTypeFieldsConfig<
        TOutput extends OutputTypesNames
      > = FieldsConfig<OutputTypeFieldNames<TOutput>>;

      export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
        class?: ClassDecorator[];
        fields?: OutputTypeFieldsConfig<TOutput>;
      };

      export type OutputTypesEnhanceMap = {
        [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
      };

      export function applyOutputTypesEnhanceMap(
        outputTypesEnhanceMap: OutputTypesEnhanceMap,
      ) {
        for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
          const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
          const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
          const typeClass = outputTypes[outputTypeName];
          const typeTarget = typeClass.prototype;
          applyTypeClassEnhanceConfig(
            typeConfig,
            typeClass,
            typeTarget,
            outputsInfo[outputTypeName as keyof typeof outputsInfo],
          );
        }
      }

const inputsInfo = {
        DocumentWhereInput: ["AND", "OR", "NOT", "doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentOrderByWithRelationInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentWhereUniqueInput: ["id", "AND", "OR", "NOT", "doc_type", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentOrderByWithAggregationInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked", "_count", "_avg", "_max", "_min", "_sum"],
        DocumentScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        UserWhereInput: ["AND", "OR", "NOT", "email", "id", "password", "phone_number", "roles", "username"],
        UserOrderByWithRelationInput: ["email", "id", "password", "phone_number", "roles", "username"],
        UserWhereUniqueInput: ["email", "id", "username", "AND", "OR", "NOT", "password", "phone_number", "roles"],
        UserOrderByWithAggregationInput: ["email", "id", "password", "phone_number", "roles", "username", "_count", "_avg", "_max", "_min", "_sum"],
        UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "email", "id", "password", "phone_number", "roles", "username"],
        DocumentCreateInput: ["doc_type", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentUpdateInput: ["doc_type", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentCreateManyInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentUpdateManyMutationInput: ["doc_type", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        UserCreateInput: ["email", "password", "phone_number", "roles", "username"],
        UserUpdateInput: ["email", "password", "phone_number", "roles", "username"],
        UserCreateManyInput: ["email", "id", "password", "phone_number", "roles", "username"],
        UserUpdateManyMutationInput: ["email", "password", "phone_number", "roles", "username"],
        StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
        IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        Enumdocument_doc_statusFilter: ["equals", "in", "notIn", "not"],
        IntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        Enumdepartment_listFilter: ["equals", "in", "notIn", "not"],
        BoolFilter: ["equals", "not"],
        SortOrderInput: ["sort", "nulls"],
        DocumentCountOrderByAggregateInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentAvgOrderByAggregateInput: ["id", "userId"],
        DocumentMaxOrderByAggregateInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentMinOrderByAggregateInput: ["doc_type", "id", "doc_number", "doc_status", "userId", "doc_url", "department", "bookmarked"],
        DocumentSumOrderByAggregateInput: ["id", "userId"],
        StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
        IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
        Enumdocument_doc_statusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
        IntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
        Enumdepartment_listWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
        BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
        StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
        UserCountOrderByAggregateInput: ["email", "id", "password", "phone_number", "roles", "username"],
        UserAvgOrderByAggregateInput: ["id", "phone_number"],
        UserMaxOrderByAggregateInput: ["email", "id", "password", "phone_number", "roles", "username"],
        UserMinOrderByAggregateInput: ["email", "id", "password", "phone_number", "roles", "username"],
        UserSumOrderByAggregateInput: ["id", "phone_number"],
        StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
        NullableStringFieldUpdateOperationsInput: ["set"],
        Enumdocument_doc_statusFieldUpdateOperationsInput: ["set"],
        NullableIntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
        Enumdepartment_listFieldUpdateOperationsInput: ["set"],
        BoolFieldUpdateOperationsInput: ["set"],
        IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
        StringFieldUpdateOperationsInput: ["set"],
        NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
        NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        NestedEnumdocument_doc_statusFilter: ["equals", "in", "notIn", "not"],
        NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        NestedEnumdepartment_listFilter: ["equals", "in", "notIn", "not"],
        NestedBoolFilter: ["equals", "not"],
        NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
        NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
        NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        NestedEnumdocument_doc_statusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
        NestedIntNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
        NestedFloatNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
        NestedEnumdepartment_listWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
        NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
        NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
        NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"]
    };

      type InputTypesNames = keyof typeof inputTypes;

      type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
        keyof typeof inputTypes[TInput]["prototype"],
        number | symbol
      >;

      type InputTypeFieldsConfig<
        TInput extends InputTypesNames
      > = FieldsConfig<InputTypeFieldNames<TInput>>;

      export type InputTypeConfig<TInput extends InputTypesNames> = {
        class?: ClassDecorator[];
        fields?: InputTypeFieldsConfig<TInput>;
      };

      export type InputTypesEnhanceMap = {
        [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
      };

      export function applyInputTypesEnhanceMap(
        inputTypesEnhanceMap: InputTypesEnhanceMap,
      ) {
        for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
          const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
          const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
          const typeClass = inputTypes[inputTypeName];
          const typeTarget = typeClass.prototype;
          applyTypeClassEnhanceConfig(
            typeConfig,
            typeClass,
            typeTarget,
            inputsInfo[inputTypeName as keyof typeof inputsInfo],
          );
        }
      }
    
