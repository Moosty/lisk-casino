/* global BigInt */
import React, {useContext, useEffect, useState} from "react";
import {
  AccountProjectList,
  AccountProjectSingleItem,
  Container,
  CrowdCardContainer,
  Typography
} from "@moosty/dao-storybook";
import {useBlocks} from "../hooks/blocks";
import {useHistory} from "react-router-dom";
import {crowdFundStates, userRoles} from "@moosty/dao-storybook/dist/shared/global.crowdfund";
import {useProjects} from "../hooks/projects";
import {createTransaction} from "../utils/transactions";
import {Buffer} from "@liskhq/lisk-client";
import {transactionStates} from "@moosty/dao-storybook/dist/stories/modals/templates/resultTransaction";
import moment from "moment";
import {AppContext} from "../appContext";

export const MyProjects = ({account, setModal, filters, visible}) => {
  const history = useHistory()
  const {getClient, blockTime} = useContext(AppContext);
  const {projects} = useProjects();
  const {height,} = useBlocks();
  const [registerError, setRegisterError] = useState();
  useEffect(() => {
    if (!account) {
      setModal("login")
    }
  }, [account])

  useEffect(() => console.log(projects), [projects])

  const onRegister = async (date, project) => {
    const client = await getClient
    if (moment(date).isBefore(moment().subtract(1, 'd'))) {
      setRegisterError("Project start date should be in the future")
      return
    }
    if (registerError) {
      setRegisterError(null)
    }
    const fee = await createTransaction({
      moduleId: 3510,
      assetId: 2,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        start: moment(date).isBefore(moment()) && moment(date).isAfter(moment().subtract(1, 'd')) ?
          parseInt(height + 10) :
          parseInt(Math.floor((moment(date).diff(moment()) / 1000) / blockTime) + height)
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account.username,
      transactionType: "crowd:vote",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmitRegister(date, project)
      }
    })
  }

  const onVote = async (vote, project) => {
    const client = await getClient
    const fee = await createTransaction({
      moduleId: 3510,
      assetId: 3,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        period: 0,
        vote,
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account.username,
      transactionType: "crowd:vote",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmitVote(vote, project)
      }
    })
  }
  const onClaim = async (project) => {
    const client = await getClient
    const fee = await createTransaction({
      moduleId: 3510,
      assetId: 4,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        message: ".",
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account.username,
      transactionType: "crowd:claim",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmitClaim(project)
      }
    })
  }
  const onRefund = async (project) => {
    const client = await getClient
    const fee = await createTransaction({
      moduleId: 3510,
      assetId: 5,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
      },
      account,
      client,
      getFee: true,
    })
    setModal({
      type: "transactionConfirm",
      address: account.address,
      name: account.username,
      transactionType: "crowd:refund",
      fee: `${fee} LSK`,
      ctaButton: {
        label: "Confirm",
        onClick: () => onSubmitRefund(project)
      }
    })
  }

  const onSubmitRegister = async (date, project) => {
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3510,
      assetId: 2,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        start: moment(date).isBefore(moment()) && moment(date).isAfter(moment().subtract(1, 'd')) ?
          parseInt(height + 10) :
          parseInt(Math.floor((moment(date).diff(moment()) / 1000) / blockTime) + height)
      },
      account,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setModal({
            type: "transactionResult",
            text: `You set the project start date successfully`,
            state: transactionStates.confirmed
          })
          history.push('/my-projects')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
    }
  }

  const onSubmitVote = async (vote, project) => {
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3510,
      assetId: 3,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        period: 0,
        vote,
      },
      account,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setModal({
            type: "transactionResult",
            text: `Your vote was cast successfully`,
            state: transactionStates.confirmed
          })
          history.push('/my-projects')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
    }
  }

  const onSubmitClaim = async (project) => {
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3510,
      assetId: 4,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
        message: ".",
      },
      account,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setModal({
            type: "transactionResult",
            text: `Your claim was successfully`,
            state: transactionStates.confirmed
          })
          history.push('/my-projects')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
    }
  }
  const onSubmitRefund = async (project) => {
    setModal({
      type: "transactionResult",
      text: `Submitting transaction, this can take a few seconds.`,
      state: transactionStates.pending,
    })
    const client = await getClient;
    const result = await createTransaction({
      moduleId: 3510,
      assetId: 5,
      assets: {
        crowdfund: Buffer.from(project.id, 'hex'),
      },
      account,
      client,
    })
    if (result.status) {
      const findTransaction = async () => {
        try {
          await client.transaction.get(Buffer.from(result.message.transactionId, 'hex'))
          setModal({
            type: "transactionResult",
            text: `Your refund was successfully`,
            state: transactionStates.confirmed
          })
          history.push('/my-projects')
        } catch (e) {
          setTimeout(async () => await findTransaction(), 1000)
        }
      }
      await findTransaction()

    } else {
      setModal({type: "transactionResult", text: result.message, state: transactionStates.error})
    }
  }

  return <div>
    <Container
      className={["flex", "flex-wrap", "flex-col", "my-10", "py-4", "bg-surfaceBg", "rounded-default"].join(" ")}>
      <div className="flex flex-col my-4 divide-gray-200">
        <Typography className="w-full bg-surfaceBg mt-5 " type="h4" Element="span">
          My Crowdfunds</Typography>
        <Typography className="" type="body" Element="span">Your currently running crowdfundprojects.</Typography>
      </div>
      <div className="flex flex-row flex-wrap space-x-4 space-y-4">
        {account && projects?.filter(project => project.owner.address === account.address && (project.state === crowdFundStates.PREVIEW || project.state === crowdFundStates.OPEN))
          .map((project, i) => {
              return <div key={project.id} className={i === 0 && "ml-5 mt-4"}>
                <CrowdCardContainer
                  {...project}
                  gradient
                  currentDay={height}
                  userRole={userRoles.OWNER}/>
              </div>
            }
          )}
      </div>
    </Container>
    <Container
      className={["flex", "flex-wrap", "flex-col", "mb-10", "py-4", "rounded-default"].join(" ")}>
      <div className="flex flex-col my-4 divide-gray-200">
        <Typography className="w-full mt-5 " type="h4" Element="span">
          My Projects</Typography>
        <Typography className="" type="body" Element="span">Your currently running projects</Typography>
      </div>
      <div className="flex flex-col flex-wrap space-x-4 space-y-4">
        <AccountProjectList>
          {account && projects?.filter(project => project.owner.address === account.address && (project.state !== crowdFundStates.PREVIEW && project.state !== crowdFundStates.OPEN && project.state !== crowdFundStates.CANCELED && project.state !== crowdFundStates.FAILED && project.state !== crowdFundStates.ENDED)).map((project) => {
              const lastClaim = project?.claims?.length > 0 && project?.claims.reduce((acc, claim) => acc > claim.period ? acc : claim.period, 0)
            console.log(project)
              return <AccountProjectSingleItem
                gradient
                {...project}
                targetAmount={project.budget}
                userRole={userRoles.OWNER}
                lastHeight={height}
                onClickRegister={() => setModal({
                  type: "registerStart",
                  project: {
                    ...project,
                    onClickRegister: (date) => onRegister(date, project),
                  },
                })}
                claimed={lastClaim === project.periods}
                onClickClaimOwner={() => setModal({
                  type: "claim",
                  project: {
                    ...project,
                    onClickClaim: () => onClaim(project),
                  },
                })}
                onClickClaim={() => setModal({
                  type: "refund",
                  project: {
                    ...project,
                    onClickRefund: () => onRefund(project),
                  },
                })}
                onClickCancel={() => setModal({
                  type: "cancel",
                  project: {
                    ...project,
                    onClickCancel: () => onRefund(project)
                  }
                })}
              />
            }
          )}
        </AccountProjectList>
      </div>
    </Container>
    <Container className={["mb-10"].join(" ")}>
      <div className="flex flex-col my-4 divide-gray-200">
        <Typography className="w-full mt-5 " type="h4" Element="span">
          My Investments</Typography>
        <Typography className="" type="body" Element="span">Your currently investments</Typography>
      </div>
      <AccountProjectList>
        {account?.chain?.crowd?.funded?.map(({crowdfund}) => {
          const project = {...projects?.find(project => project.id === crowdfund.toString('hex'))}
          const lastClaim = project?.claims?.length > 0 && project?.claims.reduce((acc, claim) => acc > claim.period ? acc : claim.period, 0)
          return <AccountProjectSingleItem
            gradient
            {...project}
            targetAmount={project.budget}
            noRefund={project.budget === 0 || project.refunds?.find(refund => refund.backer === account.address)}
            userRole={userRoles.BACKER}
            lastHeight={height}
            onClickRegister={() => setModal({
              type: "registerStart",
              project: {
                ...project,
                onClickRegister: (date) => onRegister(date, project),
              },
            })}
            claimed={lastClaim === project.periods}
            onClickClaimOwner={() => setModal({
              type: "claim",
              project: {
                ...project,
                onClickClaim: () => onClaim(project),
              },
            })}
            onClickClaim={() => setModal({
              type: "refund",
              project: {
                ...project,
                onClickRefund: () => onRefund(project),
              },
            })}
            onClickCancel={() => setModal({
              type: "cancel",
              project: {
                ...project,
                onClickCancel: () => onRefund(project)
              }
            })}
            onClickVote={() => setModal({
              type: "vote",
              project: {
                ...project,
                onClickYesVote: () => onVote(true, project),
                onClickNoVote: () => onVote(false, project),
              },
            })}
          />
        })}
      </AccountProjectList>
    </Container>
    <Container
      className={["flex", "flex-wrap", "flex-col", "mb-10", "py-4", "rounded-default"].join(" ")}>
      <div className="flex flex-col my-4 divide-gray-200">
        <Typography className="w-full mt-5 " type="h4" Element="span">
          My Passed Projects</Typography>
        <Typography className="" type="body" Element="span">Your ended, failed and canceled projects</Typography>
      </div>
      <div className="flex flex-col flex-wrap space-x-4 space-y-4">
        <AccountProjectList>
          {account && projects?.filter(project => project.owner.address === account.address && (project.state === crowdFundStates.CANCELED || project.state === crowdFundStates.FAILED || project.state === crowdFundStates.ENDED)).map((project) => {
              const lastClaim = project?.claims?.length > 0 && project?.claims.reduce((acc, claim) => acc > claim.period ? acc : claim.period, 0)
              console.log(lastClaim, project.claims)
              return <AccountProjectSingleItem
                gradient
                {...project}
                userRole={userRoles.OWNER}
                lastHeight={height}
                targetAmount={project.budget}
                noRefund={project.budget === 0 || project.refunds?.find(refund => refund.backer === account.address)}
                onClickRegister={() => setModal({
                  type: "registerStart",
                  project: {
                    ...project,
                    onClickRegister: (date) => onRegister(date, project),
                  },
                })}
                claimed={lastClaim === project.periods}
                onClickClaimOwner={() => setModal({
                  type: "claim",
                  project: {
                    ...project,
                    onClickClaim: () => onClaim(project),
                  },
                })}
                onClickClaim={() => setModal({
                  type: "refund",
                  project: {
                    ...project,
                    onClickRefund: () => onRefund(project),
                  },
                })}
                onClickCancel={() => setModal({
                  type: "cancel",
                  project: {
                    ...project,
                    onClickCancel: () => onRefund(project)
                  }
                })}
              />
            }
          )}
        </AccountProjectList>
      </div>
    </Container>
  </div>
}