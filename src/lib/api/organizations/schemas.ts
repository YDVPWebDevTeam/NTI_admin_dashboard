import { z } from 'zod';

import { organizationReviewStatuses } from './types';

export const updateOrganizationStatusSchema = z
  .object({
    status: z.enum(organizationReviewStatuses),
    rejectionReason: z.string().trim().optional(),
  })
  .superRefine((value, context) => {
    if (value.status === 'REJECTED' && !value.rejectionReason) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rejectionReason'],
        message: 'Rejection reason is required when status is REJECTED.',
      });
    }
  });

export type UpdateOrganizationStatusSchema = z.infer<typeof updateOrganizationStatusSchema>;
