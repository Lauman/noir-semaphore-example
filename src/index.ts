import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { poseidon2 } from "poseidon-lite"
import { CompiledCircuit } from "@noir-lang/noir_js"
import { generateNoirProof } from "@semaphore-protocol/proof"
import { verifyNoirProof } from "@semaphore-protocol/proof"

async function main() {
    const merkleTreeDepth = 10

    const message = "Hello world"
    const scope = "Scope"

    const identity = new Identity("secret")

    const group = new Group([1n, 2n, identity.commitment])
    const proof = await generateNoirProof(identity, group, message, scope, merkleTreeDepth)
    const isValid = await verifyNoirProof(proof)
    console.log("🚀 ~ main ~ isValid:", isValid)

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })