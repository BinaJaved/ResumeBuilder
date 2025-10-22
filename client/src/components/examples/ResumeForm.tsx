import { ResumeForm } from '../ResumeForm'

export default function ResumeFormExample() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ResumeForm
        onSubmit={(data) => console.log('Form submitted:', data)}
        isLoading={false}
      />
    </div>
  )
}
