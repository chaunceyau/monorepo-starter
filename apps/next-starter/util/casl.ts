import * as React from 'react';
import { createContextualCan } from '@casl/react';

export const AbilityContext = React.createContext({});
export const Can = createContextualCan(AbilityContext.Consumer);
