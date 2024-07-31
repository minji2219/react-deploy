import { Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { apiSessionStorage } from '@/utils/storage';

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const [value, setValue] = useState(apiSessionStorage.get() || 'https://api.example.com/1');

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    apiSessionStorage.set(e.target.value);
    setValue(e.target.value);
    window.location.reload();
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>

        <RightWrapper>
          <Select w="200" onChange={handleChange} defaultValue={value}>
            <option value="https://api.example.com/1">백엔드1</option>
            <option value="https://api.example.com/2">백엔드2</option>
            <option value="https://api.example.com/3">백엔드3</option>
          </Select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '54px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
`;