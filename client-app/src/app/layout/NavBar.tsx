import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";



export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Online Banking
                </Menu.Item>
                <Menu.Item as={NavLink} to='/accounts' name='Accounts' />
                <Menu.Item as={NavLink} to='/contact' name="Contact" />
                <Menu.Item as={NavLink} to='/deposit' name="Deposits" />
                <Menu.Item as={NavLink} to='/payment' name="Payments" />
                <Menu.Item as={NavLink} to='/transfers' name='Transfers' />
                <Menu.Item as={NavLink} to='/dashboard' name="Dashboard" />
                <MenuItem >
                    <Dropdown text="Services">
                        <Dropdown.Menu >
                            <Dropdown.Item as={NavLink} to='/balances' text='Balances' />
                            <Dropdown.Item as={NavLink} to='/branches' text="Branches" />
                            <Dropdown.Item as={NavLink} to='/cards' text='Cards' />
                            <Dropdown.Item as={NavLink} to='/customer' text="Customers" />
                            <Dropdown.Item as={NavLink} to='/interest' text="Interests" />
                            <Dropdown.Item as={NavLink} to='/loan' text="Loans" />
                            <Dropdown.Item as={NavLink} to='/salary' text="Salarys" />
                            <Dropdown.Item as={NavLink} to='/transaction' text="Transactions" />
                            <Dropdown.Item as={NavLink} to='/bankuser' text="Users" />
                            <Dropdown.Item as={NavLink} to='/withdraw' text='Withdraws' />
                            <Dropdown.Item as={NavLink} to='/errors' text='Errors' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
                <MenuItem position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})