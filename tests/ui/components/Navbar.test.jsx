import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";
import { fireEvent, render, screen } from "@testing-library/react";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <Navbar/>', () => {

    const contextValue = {
        logged: true,
        user: { 
            name: 'Aldo',
            id: '2703'
        },
        logout: jest.fn()
    }
    
    beforeEach(() => jest.clearAllMocks());

    test('debe de mostar el nombre del usuario loggeado', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();

    })

    test('debe de llamar el logout y navigate cuando se presiona el botón de logout', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutButton = screen.getByRole('button');
        fireEvent.click(logoutButton);

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', { replace: true });        

    })
})
