

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import {BuildControls} from '../../componenets/Burger/BuildControls/BuildControls.js';

configure({adapter: new Adapter()});

describe('Burger Builder', ()=>
{
    let wrapper;
    beforeEach (()=>{
        wrapper = shallow(<BurgerBuilder onInitIng={(ing)=> {}}/>);
        //console.log(wrapper)
    });

    it('should have BuildControls when receivining ing',()=>
    {
        //wrapper = shallow(<BurgerBuilder ing={{salad: 0}} onInitIng={(ing)=> {}} />);
  
       wrapper.setProps({ing: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);

    });
});