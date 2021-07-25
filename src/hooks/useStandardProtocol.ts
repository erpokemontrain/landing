import { useContext } from 'react';
import { Context } from '../contexts/StandardProtocolProvider';

const useStandardProtocol = () => {
  const { standardProtocol } = useContext(Context);
  return standardProtocol;
};

export default useStandardProtocol;
