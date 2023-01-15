import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProviderWrapper from '../web/components/provider-wrapper/ProviderWrapper'
import NavbarComponent from '../web/components/navbar/navbar.component'
import ModalComponent from '../web/components/modal/modal.component'
import CreatePostComponent from '../web/components/create-post/create-post.component'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { GlobalStateContext } from '../web/mobx/store'

const App = observer(({ Component, pageProps }: AppProps) => {

  const globalState = useContext(GlobalStateContext);
  
  return (
    <ProviderWrapper>
      <ModalComponent
          body={<CreatePostComponent />}
          isOpen={globalState.isOpenModal}
      />
      <NavbarComponent />
      <Component {...pageProps} />
    </ProviderWrapper>
  )
})

export default App;
