import React, {useEffect, useState} from "react";
import {cryptography, passphrase} from "@liskhq/lisk-client";
import {
  ConfirmTransactionModal,
  CreateAccountModal,
  LoginModal,
  Modal,
  ResultTransactionModal,
  Typography,
  BackProjectModal,
} from '@moosty/dao-storybook';
import { ModalTemplate } from '@moosty/dao-storybook/dist/stories/modals/ModalTemplate'

export const ModalContainer = ({currentOpen, setCurrentOpen, externalError, ctaLoading, onLogin, onRegister, cancelLabel}) => {

  const [registerAccounts, setRegisterAccounts] = useState();
  const [passphraseInput, setPassphrase] = useState();
  const [account, changeAccount] = useState(null)
  const [username, setUsername] = useState(null)
  const [usernameError, setUsernameError] = useState(null)
  const [disabledCTA, setDisabledCTA] = useState(true)

  useEffect(() => {
    if (username) {
      if (username.length > 30) {
        setUsernameError("Username should be 30 characters or shorter")
        return;
      }
      if (username.length < 3) {
        setUsernameError("Username should be at least 3 characters long")
        return;
      }
      const usernameRegex = /^(?=.{3,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      if (!username.match(usernameRegex)) {
        setUsernameError(<div>
          Username only allowed [a-zA-Z0-9._] <br/>
          (do not start or end with _ or . nor use them double)
        </div>)
        return;
      }
      setUsernameError(null)
      setDisabledCTA(false)
    }
  }, [username])

  useEffect(() => {
    changeAccount(createAccount(passphraseInput?.join(" ")))
    setDisabledCTA(false)
  }, [passphraseInput])

  useEffect(() => {
    switch (currentOpen) {
      case 'register':
        const newAccounts = [
          createAccount(passphrase.Mnemonic.generateMnemonic()),
          createAccount(passphrase.Mnemonic.generateMnemonic()),
          createAccount(passphrase.Mnemonic.generateMnemonic()),
        ]
        setRegisterAccounts(newAccounts)
        changeAccount(newAccounts[0])
        setUsername("")
        setDisabledCTA(true)
        break;
      default:
        setDisabledCTA(currentOpen?.type !== "transactionConfirm")
    }
  }, [currentOpen])

  const createAccount = (passphrase) => passphrase && ({
    passphrase: passphrase?.split(" "),
    address: cryptography.getAddressFromPassphrase(passphrase).toString('hex'),
    ...cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase),
  })

  return <Modal
    open={!!currentOpen}
    onClose={() => setCurrentOpen(null)}

  >
    {(
      currentOpen?.type !== 'back' &&
      currentOpen?.type !== 'claim' &&
      currentOpen?.type !== 'registerStart' &&
      currentOpen?.type !== 'refund' &&
      currentOpen?.type !== 'cancel' &&
      currentOpen?.type !== 'vote'
    ) && <ModalTemplate
      cancelLabel={cancelLabel}
      ctaButton={(currentOpen === 'login' || currentOpen === 'register' || currentOpen?.type === "transactionConfirm") && {
        disabled: disabledCTA || ctaLoading,
        label: [
          !ctaLoading && currentOpen === 'login' && "Sign in!",
          !ctaLoading && currentOpen === 'register' && "Sign up!",
          !ctaLoading && currentOpen?.type === "transactionConfirm" && !currentOpen?.ctaButton?.label && "Confirm",
          !ctaLoading && currentOpen?.ctaButton?.label,
          ctaLoading && "Loading...",
        ].filter(Boolean).join(),
        onClick: () => {
          if (currentOpen === 'login') {
            onLogin(account)
          }
          if (currentOpen === 'register') {
            onRegister({
              ...account,
              username,
            })
          }
          if (currentOpen?.type === "transactionConfirm") {
            currentOpen?.ctaButton?.onClick && currentOpen.ctaButton.onClick()
          }
        },
      }}
      onClose={() => setCurrentOpen(null)}
    >
    {currentOpen === 'register' && <CreateAccountModal
      accounts={registerAccounts}
      changeAccount={changeAccount}
      changeUsername={setUsername}
      gotoLogin={() => setCurrentOpen('login')}
      selectedAccount={account}
      username={username}
      usernameError={usernameError}
    />}
    <Typography Element="h2" className={"w-full text-center text-dangerDark"}>{externalError}</Typography>
    {currentOpen === 'login' && <LoginModal
      gotoSignup={() => setCurrentOpen("register")}
      changePassphrase={setPassphrase}
    />}
    {currentOpen?.type === 'transactionConfirm' && <ConfirmTransactionModal
      address={currentOpen.address}
      name={currentOpen.name}
      transaction={{
        fee: currentOpen.fee,
        type: currentOpen.transactionType,
      }}
    />}
    {currentOpen?.type === 'transactionResult' && <ResultTransactionModal
      transactionId={currentOpen.id}
      state={currentOpen.state}
      text={currentOpen.text}
    />}

    </ModalTemplate>}
    {(
      currentOpen?.type === 'back' ||
      currentOpen?.type === 'claim' ||
      currentOpen?.type === 'vote' ||
      currentOpen?.type === 'refund' ||
      currentOpen?.type === 'cancel' ||
      currentOpen?.type === 'registerStart'
    ) && <BackProjectModal
      {...currentOpen.project}
      iconCancel
      onClose={() => setCurrentOpen(null)}
      back={currentOpen?.type === 'back'}
      register={currentOpen?.type === 'registerStart'}
      vote={currentOpen?.type === 'vote'}
      claim={currentOpen?.type === 'claim'}
      refund={currentOpen?.type === 'refund'}
      cancel={currentOpen?.type === 'cancel'}
    />}
  </Modal>
}