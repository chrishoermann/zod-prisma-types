import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { SortOrderSchema } from './SortOrderSchema';
import { PostOrderByRelationAggregateInputSchema } from './PostOrderByRelationAggregateInputSchema';
import { ProfileOrderByWithRelationInputSchema } from './ProfileOrderByWithRelationInputSchema';
import { LocationOrderByWithRelationInputSchema } from './LocationOrderByWithRelationInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  enum: z.lazy(() => SortOrderSchema).optional(),
  scalarList: z.lazy(() => SortOrderSchema).optional(),
  lat: z.lazy(() => SortOrderSchema).optional(),
  lng: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional(),
}).strict()

export default UserOrderByWithRelationInputSchema
