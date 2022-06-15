import React from "react";
import {
  PaymentMethod,
  usePaymentMethodCreateIntentCreate,
  usePaymentMethodList,
} from "../../generated/apiFetchers";
import { PaymentMethods } from "./PaymentMethods";

export const PaymentMethodsContainer: React.FC = () => {
  const { data: paymentMethods } = usePaymentMethodList({});
  const { mutate: createIntent } = usePaymentMethodCreateIntentCreate({});

  const handleCreateIntent = async () => {
    return await createIntent({} as PaymentMethod);
  };

  //const handleRefetch = async () => {
  //  await refetch();
  //};

  return (
     <PaymentMethods
       paymentMethods={paymentMethods?.results || []}
       createSetupIntent={handleCreateIntent}
      // refetch={handleRefetch}
     />
   );
};


/*import React, { useEffect, useState } from "react";
// import {
//   PaymentMethod,
//   usePaymentMethodCreateIntentCreate,
//   usePaymentMethodList,
// } from "../../generated/apiFetchers";
import { PaymentMethods } from "./PaymentMethods";

export const PaymentMethodsContainer: React.FC = () => {
  const { data: paymentMethods, refetch } = usePaymentMethodList({});

  const { mutate: createIntent } = usePaymentMethodCreateIntentCreate({});

  const handleCreateIntent = async () => {
    return await createIntent({} as PaymentMethod);
  };

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <PaymentMethods
      paymentMethods={paymentMethods?.results || []}
      createSetupIntent={handleCreateIntent}
      refetch={handleRefetch}
    />
  );
};
*/
