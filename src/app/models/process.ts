export class Process {
  uuid!: string;
  name!: string;
  areaId!: number;
  createdBy!: string;
  sourceAreaId!: number;
  targetAreaId!: number;
  source!: number;
  entityName!: string;
  entityNIF!: string;
  createdAt!: string;
  qrCodeUuid!: string;
  obs!: string;
}

export class ProcessHistory {
  uuid!: string;
  action!: string;
  obs!: string;
  createdBy!: string;
  fileUuid!: string;
  processUuid!: string;
  createdAt!: string;
}
