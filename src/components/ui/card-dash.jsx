import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

export function CardWithForm({ title, desc, className, tokenSubmit,}) {
    const { register, handleSubmit } = useForm(
        {
            defaultValues: {
                tokens: 0
            }
        }
    )

    return (
        <Card className="w-[350px]">
            {title ==="Add Tokens" ? <form onSubmit={handleSubmit(tokenSubmit)} className="flex flex-col p-5 justify-center items-center">
                <Input
                    id="tokens"
                    type="number"
                    {...register('tokens', { required: 'Please enter the number of tokens' })}
                />
                <Button type="submit" className="mt-5 w-1/2">Add Tokens</Button>
            </form>:

           <CardHeader className= "flex flex-col w-full">
                <CardTitle className={className}>{title}</CardTitle>
                <CardDescription>{`${`${title === "Balance" ? ' ₹ ' + desc : desc} `}`}</CardDescription>
            </CardHeader>
}
        </Card>
    )
}