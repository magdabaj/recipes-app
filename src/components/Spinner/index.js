
import React, { memo } from 'react';
import ReactLoading from 'react-loading';
import colorStyles from '../../utils/colorStyles';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 70px;
  // margin-top: 50%;
  // min-height: 800px;
  
  @media (min-width: 768px) {
    margin-top: 50%;
  }
  // @media (max-width: 769px) {
  //   margin-top: 90px
  // }
`;

const Spinner = ({ color, width, height }) => {
    return (
        <Wrapper>
            <ReactLoading
                color={color ? color : colorStyles.darkPink}
                type={'spinningBubbles'}
                height={height ? height : '50%'}
                width={width ? width : '50%'}
            />
        </Wrapper>
    );
};

// todo add react memo
export default Spinner;
