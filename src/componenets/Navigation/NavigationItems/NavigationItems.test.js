
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems'
import { NavLink } from 'react-router-dom';
configure({adapter: new Adapter()});

describe('Nativation Items', ()=>
{
    let wrapper = null;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });
    it('should render 2 nav item elements if not authenticated', () =>
    {
         expect(wrapper.find(NavLink)).toHaveLength(2);

    });

    it('should render 3 nav item elements if authenticated', () =>
    {
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavLink)).toHaveLength(3);

    });
    it('should contains logout nav link when authenticated', () =>
    {
        wrapper.setProps({isAuth:true})      
        expect(wrapper.contains(<NavLink 
            to="/logout" 
            exact
            
            >
              Log out
            </NavLink>)).toEqual(true);

    });
});