import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateNoirProof } from "@semaphore-protocol/proof"
import { verifyNoirProof } from "@semaphore-protocol/proof"
import { SemaphoreSubgraph } from "@semaphore-protocol/data"
import { SupportedNetwork } from "@semaphore-protocol/utils"

const reCreateGroup = async (idGroup:string,network:SupportedNetwork) => {
    const semaphoreSubgraph = new SemaphoreSubgraph(network)

    const { members } = await semaphoreSubgraph.getGroup(idGroup, { members: true })

    return members
}
async function main() {

    const message = "Hello world"
    const scope = "Scope"

    const identity = new Identity("secret")

    // Re create group 
    const members = await reCreateGroup("0",'sepolia')

    const group = new Group(members)

     group.addMember(identity.commitment)

    const proof = await generateNoirProof(identity, group, message,group.root)
    const isValid = await verifyNoirProof(proof)
    console.log("🚀 ~ main ~ isValid:", isValid)

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })