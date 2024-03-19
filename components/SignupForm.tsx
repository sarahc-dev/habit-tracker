"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignupSchema } from "@/lib/schemas"
import { signupUser } from "@/actions/auth"
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitButton from "./ui/SubmitButton"
import FormSuccess from "./form/FormSuccess"
import FormError from "./form/FormError"

export default function SignupForm() {
  const [status, setStatus] = useState({
    error: "",
    success: "",
  })
  const [pending, setPending] = useState(false)

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    setStatus({
      error: "",
      success: "",
    })
    setPending(true)

    const result = await signupUser(values)
    console.log(result)
    result.error && setStatus({ error: result.error, success: "" })
    result.success && setStatus({ error: "", success: result.success })
    setPending(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  autoComplete="email"
                  data-testid="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormError message={status.error} />
        <FormSuccess message={status.success} />
        <SubmitButton pending={pending}>Signup</SubmitButton>
      </form>
    </Form>
  )
}
