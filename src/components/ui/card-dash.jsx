import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";

export function CardWithForm({ title, desc, className}) {
    return (
        <Card className="w-[350px]">
            <CardHeader className= "flex flex-col w-full">
                <CardTitle className={className}>{title}</CardTitle>
                <CardDescription>{`${`${title === "Balance" ? ' ₹ ' + desc : desc} `}`}</CardDescription>
            </CardHeader>
        </Card>
    )
}