import { useRoutes } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Home } from '../../pages/Home';
import { Error } from '../../pages/Error';
import { OversizeAndOwerweight } from '../../pages/OversizeAndOwerweight';
import { ExtendedPermit } from '../../pages/ExtendedPermit';
import { TermsAndConditions } from '../../pages/TermsAndConditions';
import { CalculatingForm } from '../../pages/CalculatingForm';
import { TruckDriverForm } from '../../pages/CalculatingForm/TruckDriverForm';
import { RouteForm } from '../../pages/CalculatingForm/RouteForm';
import { Accept } from '../../pages/CalculatingForm/Accept';
import { Payment } from '../../pages/CalculatingForm/PaymentForm';
import { Declined } from '../../pages/CalculatingForm/Declined';

export function UseRoutes() {
    let element = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/oversize-and-overweight-permit',
                    element: <OversizeAndOwerweight />
                },
                {
                    path: '/extended-permit',
                    element: <ExtendedPermit />
                },
                {
                    path: '/terms-and-conditions',
                    element: <TermsAndConditions />
                },
                {
                    path: '/calculating-form',
                    element: <CalculatingForm />,
                    children: [
                        {
                            path: 'truck',
                            element: <TruckDriverForm />
                        },
                        {
                            path: 'route',
                            element: <RouteForm />
                        },
                        {
                            path: 'payment',
                            element: <Payment />
                        },
                        {
                            path: 'accept',
                            element: <Accept />
                        },
                        {
                            path: 'declined',
                            element: <Declined />
                        },
                    ]
                },
            ]
        },
        {
            path: '*',
            element: <Error />
        }
    ])

    return element
}